import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Upload, FileText, CreditCard } from 'lucide-react';

interface SellerOnboardingProps {
  onComplete: () => void;
}

const ghanaRegions = [
  'Greater Accra', 'Ashanti', 'Western', 'Central', 'Eastern', 'Northern',
  'Upper East', 'Upper West', 'Volta', 'Brong-Ahafo', 'Savannah',
  'North East', 'Ahafo', 'Bono', 'Bono East', 'Oti'
];

const SellerOnboarding: React.FC<SellerOnboardingProps> = ({ onComplete }) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    storeName: '',
    ghanaCardNumber: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    storeDescription: ''
  });
  const [ghanaCardImage, setGhanaCardImage] = useState<File | null>(null);
  const [businessCertificate, setBusinessCertificate] = useState<File | null>(null);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const uploadFile = async (file: File, bucket: string, folder: string) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${folder}/${Date.now()}.${fileExt}`;
    
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(fileName, file);

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from(bucket)
      .getPublicUrl(fileName);

    return publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setIsLoading(true);
    try {
      // Validate required fields
      if (!formData.fullName || !formData.phone || !formData.storeName || !formData.storeDescription || !formData.region || !formData.ghanaCardNumber || !ghanaCardImage) {
        toast({
          title: "Error",
          description: "Please fill in all required fields including Ghana Card number and image",
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      let ghanaCardImageUrl = '';
      let businessCertificateUrl = '';

      // Upload Ghana card image if provided
      if (ghanaCardImage) {
        ghanaCardImageUrl = await uploadFile(ghanaCardImage, 'product-images', 'ghana-cards');
      }

      // Upload business certificate if provided
      if (businessCertificate) {
        businessCertificateUrl = await uploadFile(businessCertificate, 'product-images', 'certificates');
      }

      // Insert seller information
      const { error } = await supabase
        .from('sellers')
        .insert({
          user_id: user.id,
          full_name: formData.fullName,
          store_name: formData.storeName,
          ghana_card_number: formData.ghanaCardNumber,
          ghana_card_image_url: ghanaCardImageUrl,
          business_certificate_url: businessCertificateUrl,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          region: formData.region,
          store_description: formData.storeDescription,
          verification_status: 'pending'
        });

      if (error) throw error;

      toast({
        title: "Store Created Successfully!",
        description: "Your seller account is pending verification. You can now start listing products.",
      });

      onComplete();
    } catch (error) {
      console.error('Error creating seller account:', error);
      toast({
        title: "Error",
        description: "Failed to create seller account. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container max-w-2xl py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Create Your GBay Store</CardTitle>
          <CardDescription>
            Set up your seller account to start selling on GBay Ghana. 
            Provide your details for verification.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Personal Information</h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="0XX XXX XXXX"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ghanaCardNumber">Ghana Card Number *</Label>
                <Input
                  id="ghanaCardNumber"
                  value={formData.ghanaCardNumber}
                  onChange={(e) => handleInputChange('ghanaCardNumber', e.target.value)}
                  placeholder="GHA-XXXXXXXXX-X"
                  required
                />
              </div>

              <div>
                <Label>Ghana Card Image *</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label htmlFor="ghanaCard" className="cursor-pointer">
                        <span className="text-primary hover:text-primary/80">
                          Upload Ghana Card Image
                        </span>
                        <Input
                          id="ghanaCard"
                          type="file"
                          accept="image/*"
                          onChange={(e) => setGhanaCardImage(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {ghanaCardImage ? ghanaCardImage.name : 'PNG, JPG up to 5MB'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Store Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Store Information</h3>
              
              <div>
                <Label htmlFor="storeName">Store Name *</Label>
                <Input
                  id="storeName"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                  placeholder="Enter your store name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="storeDescription">Store Description</Label>
                <Textarea
                  id="storeDescription"
                  value={formData.storeDescription}
                  onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                  placeholder="Describe what you sell..."
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder="Enter your city"
                  />
                </div>
                
                <div>
                  <Label htmlFor="region">Region</Label>
                  <Select value={formData.region} onValueChange={(value) => handleInputChange('region', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      {ghanaRegions.map((region) => (
                        <SelectItem key={region} value={region}>
                          {region}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="address">Address</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter your full address"
                  rows={2}
                />
              </div>
            </div>

            {/* Business Certificate (Optional) */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Business Documents (Optional)</h3>
              
              <div>
                <Label>Business Certificate</Label>
                <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6">
                  <div className="text-center">
                    <FileText className="mx-auto h-12 w-12 text-muted-foreground" />
                    <div className="mt-4">
                      <Label htmlFor="businessCert" className="cursor-pointer">
                        <span className="text-primary hover:text-primary/80">
                          Upload Business Certificate
                        </span>
                        <Input
                          id="businessCert"
                          type="file"
                          accept="image/*,.pdf"
                          onChange={(e) => setBusinessCertificate(e.target.files?.[0] || null)}
                          className="hidden"
                        />
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        {businessCertificate ? businessCertificate.name : 'PDF, PNG, JPG up to 5MB (Optional)'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? 'Creating Store...' : 'Create Store'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SellerOnboarding;